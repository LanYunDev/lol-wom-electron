import { ipcMain, dialog } from 'electron';
import { init_lcu, getCurrentSummoner, get, post, getClientUrl } from '../lcu/client';


import { setupASR } from '../ipc/asr';
import { setupASRModelManager } from '../ipc/asr_model_manager';
import { setupShortcut } from '../ipc/shortcut';



function test(_, data) {
  console.log('test', data);
}
export function setupIPC(win) {
  ipcMain.handle('test', test);
  ipcMain.handle('init_lcu', () => init_lcu(win));
  ipcMain.handle('current-summoner', getCurrentSummoner);
  ipcMain.handle('get-client-url', getClientUrl);
  ipcMain.handle('get-url', get);
  ipcMain.handle('post-url', post)
  setupASR(win)
  setupASRModelManager(win)
  setupShortcut(win)
}