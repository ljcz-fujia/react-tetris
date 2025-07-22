import store from '../store';
import todo from './todo';

const keyboard = {
  37: 'left',
  38: 'rotate',
  39: 'right',
  40: 'down',
  32: 'space',
  83: 's',
  82: 'r',
  80: 'p',
};
// add for Gamepad 20221101
let ButtonActive = 0;
const update = () => {
  for (const gamepad of navigator.getGamepads()) {
    //  if (!gamepad) continue;
    for (const [index, button] of gamepad.buttons.entries()) {
      // 1 left Button0
      if (index === 0 && button.touched) {
        const type = keyboard[37];// keycode
        if (ButtonActive === 0) {
          todo[type].down(store);
          todo[type].up(store);
          ButtonActive = 1;
        }
      } else if (index === 0 && !button.touched) {
        if (ButtonActive === 1) {
          ButtonActive = 0;
        }
      }
      // 2 rotate Button3
      if (index === 3 && button.touched) {
        const type = keyboard[38];// keycode
        if (ButtonActive === 0) {
          todo[type].down(store);
          todo[type].up(store);
          ButtonActive = 2;
        }
      } else if (index === 3 && !button.touched) {
        if (ButtonActive === 2) {
          ButtonActive = 0;
        }
      }
      // 3 right Button1
      if (index === 1 && button.touched) {
        const type = keyboard[39];// keycode
        if (ButtonActive === 0) {
          todo[type].down(store);
          todo[type].up(store);
          ButtonActive = 3;
        }
      } else if (index === 1 && !button.touched) {
        if (ButtonActive === 3) {
          ButtonActive = 0;
        }
      }
      // 4 space Button2
      if (index === 2 && button.touched) {
        const type = keyboard[32];// keycode
        if (ButtonActive === 0) {
          todo[type].down(store);
          todo[type].up(store);
          ButtonActive = 4;
        }
      } else if (index === 2 && !button.touched) {
        if (ButtonActive === 4) {
          ButtonActive = 0;
        }
      }
    }
  }
};

setInterval(update, 100);
// add for Gamepad 20221101

let keydownActive;

const boardKeys = Object.keys(keyboard).map(e => parseInt(e, 10));

const keyDown = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    return;
  }
  keydownActive = type;
  todo[type].down(store);
};

const keyUp = (e) => {
  if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
    return;
  }
  const type = keyboard[e.keyCode];
  if (type === keydownActive) {
    keydownActive = '';
  }
  todo[type].up(store);
};

document.addEventListener('keydown', keyDown, true);
document.addEventListener('keyup', keyUp, true);
// add for Gamepad 20221031
window.addEventListener('gamepadconnected', update, true);
