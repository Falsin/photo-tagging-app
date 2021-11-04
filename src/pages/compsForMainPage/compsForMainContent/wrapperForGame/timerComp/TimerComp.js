import React, { useEffect } from "react";
import correctFormat from "../../../../../commonFunc/correctFormat";

export default function TimerComp(props) {
  useEffect(() => {
    let timerId;

    if (!props.isGameOver) {
      const second = ++props.timeObj.second;

      timerId = setTimeout(() => {
        if (second < 60) {
          props.setTimer(
            {
              minut: props.timeObj.minut,
              second: second,
            }
          )
        } else {
          props.setTimer(
            {
              minut: ++props.timeObj.minut,
              second: 0,
            }
          )
        }
      }, 1000)
    }

    return () => clearTimeout(timerId);
  })

  return <div>{correctFormat(props.timeObj)}</div>
}