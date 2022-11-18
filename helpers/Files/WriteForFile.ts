import * as fs from "fs";

export class WriteForFile {
  public static async writeForFile(path: string, data: string): Promise<void> {
    await fs.promises.writeFile(path, data);
  }

  public static async readForFile(path: string): Promise<string> {
    return await fs.promises.readFile(path, "utf8");
  }

  public static deleteForFile(path: string): void {
    fs.unlinkSync(path);
  }

  public static existsForFile(path: string): boolean {
    return fs.existsSync(path);
  }

  public static async createDirectory(path: string): Promise<string> {
    await fs.promises.mkdir(path, { recursive: true });
    return path;
  }
}
