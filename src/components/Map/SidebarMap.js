import React from 'react'
import { List } from './MapStyles'
import { coords } from '../../data/MapData'

export const SidebarMap = () => {
  return (
    <List>
      <h2>LUGARES TURISTICOS</h2>
      {coords.map(({ id, name, position }) => (
        <h3>{name}</h3>
      ))}
    </List>
  )
}
