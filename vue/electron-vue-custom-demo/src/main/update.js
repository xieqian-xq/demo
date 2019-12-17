import { ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import { build } from '../../package.json'

export default function createUpdateHandle(mainWindow) {
  if (build && build.publish) {
    const feedURL = build.publish[0].url

    return function updateHandle() {
      let message = {
        error: '检查更新出错',
        checking: '正在检查更新',
        updateAva: '检测到新版本，正在下载',
        updateNotAva: '现在使用的就是最新版本，不用更新'
      }

      autoUpdater.setFeedURL(feedURL)

      autoUpdater.on('error', error => {
        sendUpdateMessage(message.error, error)
      })

      autoUpdater.on('checking-for-update', () => {
        sendUpdateMessage(message.checking)
      })

      autoUpdater.on('update-available', res => {
        sendUpdateMessage(message.updateAva, res, 'available')
      })

      autoUpdater.on('update-not-available', res => {
        sendUpdateMessage(message.updateNotAva, res)
      })

      autoUpdater.on('download-progress', progress => {
        sendUpdateProgress('下载中', progress)
      })

      autoUpdater.on('update-downloaded', res => {
        sendUpdateDownloaded('下载完成', res)
      })

      ipcMain.on('checkForUpdate', () => {
        autoUpdater.checkForUpdates()
      })

      ipcMain.on('install', () => {
        autoUpdater.quitAndInstall()
      })
    }
  } else {
    return () => {}
  }

  function sendUpdateMessage(msg, data, type) {
    sendFn('update-message', { msg, data, type })
  }

  function sendUpdateProgress(msg, data) {
    sendFn('update-progress', { msg, data })
  }

  function sendUpdateDownloaded(msg, data) {
    sendFn('update-downloaded', { msg, data })
  }

  function sendFn(event, data) {
    mainWindow.webContents.send(event, data)
  }
}
