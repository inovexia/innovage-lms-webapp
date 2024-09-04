import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

export const LogsRouting = ({ dictionary, locale }) => (

    <MenuItem href={`/${locale}/logs/logs`}>{dictionary['navigation'].logs}</MenuItem>


)
