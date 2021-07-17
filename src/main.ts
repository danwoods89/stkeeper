import { app, BrowserWindow, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import fs from 'graceful-fs';
import { Score } from './types';

const createWindow = (): void => {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  console.log(isDev);
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${app.getAppPath()}/index.html`,
  );
}

app.on('ready', () => {
  createWindow();
  ipcMain.on('save', (_event, arg: Score) => {
    fs.writeFile('C:\\Users\\Dan\\Documents\\Home.txt', arg.home, (error) => { if (error) console.log(error) });
    fs.writeFile('C:\\Users\\Dan\\Documents\\HomeScore.txt', arg.homeScore.toString(), (error) => { if (error) console.log(error) });
    fs.writeFile('C:\\Users\\Dan\\Documents\\Away.txt', arg.away, (error) => { if (error) console.log(error) });
    fs.writeFile('C:\\Users\\Dan\\Documents\\AwayScore.txt', arg.awayScore.toString(), (error) => { if (error) console.log(error) });
  });
});