declare module "ua-parser-js" {
  interface Browser {
    name?: string;
    version?: string;
  }

  interface OS {
    name?: string;
    version?: string;
  }

  interface Device {
    vendor?: string;
    model?: string;
    type?: string;
  }

  class UAParser {
    constructor(uastring?: string);
    getBrowser(): Browser;
    getOS(): OS;
    getDevice(): Device;
  }

  export = UAParser;
}