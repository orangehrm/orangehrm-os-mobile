/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import SafeAreaLayout from 'layouts/SafeAreaLayout';
import Text from 'components/DefaultText';
import Divider from 'components/DefaultDivider';
import withTheme, {WithTheme} from 'lib/hoc/withTheme';
import useTheme from 'lib/hook/useTheme';

// Licence bodies vary from a couple of hundred characters to several thousand lines, so rows are
// appended a page at a time as the user reaches the end rather than handing FlatList every row at
// once. That keeps the number of tall cells competing for layout small, which is what causes the
// blank gaps and stutter during fast scrolling.
const PAGE_SIZE = 10;

// A library can bundle its own dependencies' licences into one enormous file. Laying that out in a
// single Text node blocks the UI thread long enough to look like a freeze, and re-does it every
// time the row scrolls back into view. Rows past this size therefore render collapsed with a
// toggle: the full text is still in the manifest and still reachable, it just isn't laid out until
// the user asks for it. Every other row is unaffected.
const LONG_TEXT_THRESHOLD = 5000;
const COLLAPSED_LINE_COUNT = 12;

// Expanding a long licence in one step is its own problem: the row's height jumps from 12 lines to
// thousands, so FlatList's cached height for it is instantly wrong and it blanks while re-measuring.
// The text is therefore revealed a chunk at a time, so the row grows in small steps that layout can
// keep up with. Chunks are cut at newline boundaries so joining them back is byte-identical to the
// original and no word is split across two Text nodes.
const CHUNK_SIZE = 8000;

const LICENSE_TEXT_NOT_AVAILABLE = 'License text not provided by this library';
const SHOW_FULL_LICENSE = 'Show full license';
const SHOW_LESS = 'Show less';

export const splitLicenseText = (
  text: string | null,
  chunkSize: number = CHUNK_SIZE,
) => {
  if (typeof text !== 'string' || text.length === 0) {
    return [];
  }
  // A chunk size below 1 would leave `start` where it is and spin forever, freezing the JS thread
  // with no error to show for it. Anything unusable falls back to the default.
  const size =
    Number.isFinite(chunkSize) && chunkSize >= 1
      ? Math.floor(chunkSize)
      : CHUNK_SIZE;

  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(start + size, text.length);
    if (end < text.length) {
      const newlineIndex = text.indexOf('\n', end);
      end = newlineIndex === -1 ? text.length : newlineIndex + 1;
    }
    chunks.push(text.slice(start, end));
    start = end;
  }
  return chunks;
};

// InteractionManager waits for scrolling/touches to settle before appending the next chunk, so the
// reveal never competes with a gesture. It is absent under this repo's jest environment, hence the
// setTimeout fallback.
const scheduleChunk = (callback: () => void) => {
  if (
    InteractionManager &&
    typeof InteractionManager.runAfterInteractions === 'function'
  ) {
    return InteractionManager.runAfterInteractions(callback);
  }
  const timeoutId = setTimeout(callback, 0);
  return {cancel: () => clearTimeout(timeoutId)};
};

/**
 * Pure so the malformed-manifest paths below are directly testable. The manifest is generated and
 * release gated, so a bad shape means a hand edit or a bad merge, but this screen is a legal
 * disclosure reached from About and an empty list is a far better failure than a crash on open.
 */
export const toLicenseRows = (manifest: LicenseManifest): LicenseRow[] => {
  const packages = Array.isArray(manifest?.packages) ? manifest.packages : null;
  if (packages === null) {
    /* eslint-disable no-console */
    console.error(
      'Third party license manifest has no packages array, rendering an empty list.',
    );
    /* eslint-enable no-console */
    return [];
  }
  const texts = manifest?.texts || {};

  return packages.map((licensePackage) => {
    let licenseText: string | null = null;
    if (licensePackage.licenseTextId) {
      const resolved = texts[licensePackage.licenseTextId];
      if (typeof resolved === 'string') {
        licenseText = resolved;
      } else {
        // Distinct from a library that genuinely ships no licence file: here we hold an id and
        // failed to resolve it, so the row would otherwise claim "not provided" and silently
        // misstate the attribution.
        /* eslint-disable no-console */
        console.error(
          `License text "${licensePackage.licenseTextId}" for ${licensePackage.name} is missing from the manifest.`,
        );
        /* eslint-enable no-console */
      }
    }
    return {
      name: licensePackage.name,
      license: licensePackage.license,
      licenseText: licenseText,
    };
  });
};

// The manifest is imported by this screen alone, and the screen is reached from About. Requiring it
// on first render instead of at module scope keeps it off the startup path; the result is cached so
// later renders and re-entries are free.
let cachedRows: LicenseRow[] | null = null;

export const getLicenseRows = () => {
  if (cachedRows === null) {
    cachedRows = toLicenseRows(require('./data/thirdPartyLicenses.json'));
  }
  return cachedRows;
};

// Memoised so appending a page does not re-render the rows already on screen, and so each row owns
// its own expand state rather than forcing the whole list to re-render on a toggle.
export const LicenseListItem = React.memo((props: {item: LicenseRow}) => {
  const {item} = props;
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const [visibleChunkCount, setVisibleChunkCount] = React.useState(1);
  const isLongText =
    Boolean(item.licenseText) &&
    (item.licenseText as string).length > LONG_TEXT_THRESHOLD;
  const collapsed = isLongText && !expanded;

  const chunks = React.useMemo(
    () => (isLongText ? splitLicenseText(item.licenseText) : []),
    [isLongText, item.licenseText],
  );

  // Append one chunk per settled frame until the whole licence is on screen.
  React.useEffect(() => {
    if (!expanded || visibleChunkCount >= chunks.length) {
      return undefined;
    }
    const handle = scheduleChunk(() =>
      setVisibleChunkCount((current) => current + 1),
    );
    return () => handle.cancel();
  }, [expanded, visibleChunkCount, chunks.length]);

  // Both setters are called directly rather than nesting one inside the other's updater, an
  // updater must be pure and React may invoke it more than once.
  const toggleExpanded = () => {
    if (expanded) {
      setVisibleChunkCount(1); // drop the laid out chunks again on collapse
    }
    setExpanded(!expanded);
  };

  const licenseTextStyle = {
    fontSize: theme.typography.smallFontSize,
    color: theme.typography.primaryColor,
    lineHeight: theme.spacing * 5,
  };

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing * 4,
        paddingVertical: theme.spacing * 4,
      }}>
      <Text
        style={[
          styles.bold,
          {
            fontSize: theme.typography.mediumFontSize,
            color: theme.typography.darkColor,
          },
        ]}>
        {item.name}
      </Text>
      <Text
        style={{
          fontSize: theme.typography.smallFontSize,
          color: theme.typography.primaryColor,
        }}>
        {item.license}
      </Text>
      <View style={{marginTop: theme.spacing * 2}}>
        {!item.licenseText ? (
          <Text
            style={[
              styles.italic,
              {
                fontSize: theme.typography.smallFontSize,
                color: theme.typography.primaryColor,
              },
            ]}>
            {LICENSE_TEXT_NOT_AVAILABLE}
          </Text>
        ) : collapsed || !isLongText ? (
          <Text
            style={licenseTextStyle}
            numberOfLines={collapsed ? COLLAPSED_LINE_COUNT : undefined}>
            {item.licenseText}
          </Text>
        ) : (
          chunks.slice(0, visibleChunkCount).map((chunk, chunkIndex) => (
            <Text key={chunkIndex} style={licenseTextStyle}>
              {chunk}
            </Text>
          ))
        )}
      </View>
      {isLongText ? (
        <TouchableOpacity onPress={toggleExpanded}>
          <Text
            style={[
              styles.bold,
              {
                fontSize: theme.typography.fontSize,
                color: theme.palette.secondary,
                marginTop: theme.spacing * 2,
              },
            ]}>
            {expanded ? SHOW_LESS : SHOW_FULL_LICENSE}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
});

LicenseListItem.displayName = 'LicenseListItem';

const Licenses = (props: LicensesProps) => {
  const {theme} = props;
  const rows = React.useMemo(() => getLicenseRows(), []);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

  const visibleRows = React.useMemo(
    () => rows.slice(0, visibleCount),
    [rows, visibleCount],
  );
  const hasMore = visibleCount < rows.length;

  const loadNextPage = () => {
    if (hasMore) {
      setVisibleCount((current) => Math.min(current + PAGE_SIZE, rows.length));
    }
  };

  return (
    <SafeAreaLayout>
      <FlatList
        data={visibleRows}
        renderItem={({item}) => <LicenseListItem item={item} />}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={() => (
          <View style={{paddingHorizontal: theme.spacing}}>
            <Divider />
          </View>
        )}
        // SafeAreaLayout adds no bottom inset on Android, so the last licence would otherwise end
        // flush against the navigation bar with nothing after it.
        contentContainerStyle={{paddingBottom: theme.spacing * 12}}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMore ? (
            <View style={{paddingVertical: theme.spacing * 5}}>
              <ActivityIndicator size={'small'} color={theme.palette.primary} />
            </View>
          ) : null
        }
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
        updateCellsBatchingPeriod={100}
      />
    </SafeAreaLayout>
  );
};

export type LicensePackage = {
  name: string;
  version: string;
  license: string | null;
  licenseFile: string | null;
  licenseTextId: string | null;
  licenseTextSource: string;
  repository: string | null;
};

export type LicenseManifest = {
  texts: {[key: string]: string};
  packages: LicensePackage[];
};

export type LicenseRow = {
  name: string;
  license: string | null;
  licenseText: string | null;
};

interface LicensesProps extends WithTheme {}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

export default withTheme<LicensesProps>()(Licenses);
