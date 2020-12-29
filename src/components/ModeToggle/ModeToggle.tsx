import React, { FC, useEffect } from 'react'
import { HiOutlineSun } from 'react-icons/hi'
import { BiMoon } from 'react-icons/bi'

import classes from './ModeToggle.module.css'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const ModeToggle: FC<Props> = ({ checked, onChange }) => {
  useEffect(() => {
    /*
     * 本番環境の場合、ライトモード時に最初のクリックが効かない現象が起きるため
     * 最初に無理矢理クリックアクションを発生させている
     */
    if (process.env.NODE_ENV === 'production') {
      if (!checked) {
        const checkbox = document.getElementById('mode-toggle')

        if (checkbox) {
          checkbox.click()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.wrapper}>
      <HiOutlineSun size={30} />

      <div className={classes.toggle}>
        <input id="mode-toggle" className={classes.input} type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
        <label htmlFor="mode-toggle" className={classes.trigger}>
          toggle mode
        </label>
      </div>

      <BiMoon size={30} />
    </div>
  )
}
