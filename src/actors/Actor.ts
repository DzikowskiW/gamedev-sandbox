export interface Actor {
  render(): void,
  update(): void,
  getAssetPaths(): Array<string>
};
