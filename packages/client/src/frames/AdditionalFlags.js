const bitflags = {
  public: 1,
};

export default class AdditionalFlags {
  _sum: number = 0;

  constructor(config) {
    // accumulate all bitflags
    Object.keys(config).map(key => {
      if (config[key]) {
        this._sum = this._sum | bitflags[key];
      }
    });
  }

  static fromSum(sum) {
    const addFlagToReturn = new AdditionalFlags({});
    addFlagToReturn._sum = sum;
    return addFlagToReturn;
  }

  bytes() {
    return [(this._sum >> 8) & 0xff, this._sum & 0xff];
  }

  sum() {
    return this._sum;
  }
}
