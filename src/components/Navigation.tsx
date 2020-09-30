import * as React from 'react';

import { Button, Navbar } from './blueprintjs';

export class CustomNavbar extends React.Component {
  render() {
    return (
      <Navbar fixedToTop>
        <Navbar.Group align="left">
          <Navbar.Heading>wiisportsresorts</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="home" text="Home" />
          <Button className="bp3-minimal" icon="info-sign" text="About" />
        </Navbar.Group>
        <Navbar.Group align="right">
          <DarkThemeToggle />
        </Navbar.Group>
      </Navbar>
    );
  }
}

class DarkThemeToggle extends React.Component<{}, { dark?: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { dark: false };
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  render() {
    return (
      <Button
        id="dark-theme-toggle"
        icon={this.state.dark ? 'flash' : 'moon'}
        intent="none"
        onClick={this.toggleTheme}
      />
    );
  }
  toggleTheme() {
    document.body.classList.toggle('bp3-dark');
    this.setState(({ dark }) => ({ dark: !dark }));
  }
}
