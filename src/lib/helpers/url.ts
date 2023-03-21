export const checkUrl = (
  url: string,
  withPath: boolean = true,
  withProtocol: boolean = true,
) => {
  //need to change
  return true;
  if (withPath && withProtocol) {
    return isValid(
      url.match(
        /^((https):\/\/)([\p{L}\p{N}\p{S}\-.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?((\/[\p{L}.]+)+)?$/gu,
      ),
    );
  } else if (withProtocol) {
    return isValid(
      url.match(
        /^((https):\/\/)([\p{L}\p{N}\p{S}\-.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?$/gu,
      ),
    );
  } else if (withPath) {
    return isValid(
      url.match(
        /^([\p{L}\p{N}\p{S}\-.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?(\/[\p{L}.]+)+?$/gu,
      ),
    );
  } else {
    return isValid(
      url.match(
        /^([\p{L}\p{N}\p{S}\-.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)(:[0-9]+)?$/gu,
      ),
    );
  }
};

export const checkDomain = (url: string) => {
  return isValid(
    url.match(
      /^([\p{L}\p{N}\p{S}\-.])+(\.?([\p{L}\p{N}]|xn--[\p{L}\p{N}-]+)+\.?)?$/gu,
    ),
  );
};

const isValid = (regExpMatch: RegExpMatchArray | null) => {
  if (regExpMatch === null) {
    return false;
  } else if (regExpMatch.length === 1) {
    return true;
  }
  return false;
};

export default {checkUrl, checkDomain};
