
import { ComponentProps } from '../../../types';
import { buildLink } from '../../../utils';
import { mockNavItems } from '../../1-molecules/__mocks__/mockNavItems.mocks';
import { Header } from '../Header';

export const HeaderMocks: ComponentProps<typeof Header> = {
  navItems: mockNavItems(4, true),
  LogoLink: buildLink('/'),
};