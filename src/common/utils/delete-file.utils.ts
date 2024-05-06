import * as fs from 'fs-extra';

export const deleteFile = async (path: string): Promise<void> => {
  return fs.unlink(path);
};
