import React, { FC } from 'react'
import { HiOutlineSun } from 'react-icons/hi'
import { BiMoon } from 'react-icons/bi'

import classes from './ModeToggle.module.css'

type Props = {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const ModeToggle: FC<Props> = ({ checked, onChange }) => (
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
