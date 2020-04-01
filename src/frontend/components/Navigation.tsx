import * as Bp from './blueprint';
import * as React from 'react';

export class Navbar extends React.Component {
  render() {
    return (
      <Bp.Navbar fixedToTop>
        <Bp.Navbar.Group align="left">
          <Bp.Navbar.Heading>wiisportsresorts</Bp.Navbar.Heading>
          <Bp.Navbar.Divider />
          <Bp.Button className="bp3-minimal" icon="home" text="Home" />
          <Bp.Button className="bp3-minimal" icon="info-sign" text="About" />
        </Bp.Navbar.Group>
        <Bp.Navbar.Group align="right">
          <DarkThemeToggle />
        </Bp.Navbar.Group>
      </Bp.Navbar>
    );
  }
}
let darkThemeEnabled = false;

class DarkThemeToggle extends React.Component<{}, { dark?: boolean }> {
  constructor(props) {
    super(props);
    this.state = { dark: false }
    this.toggleTheme = this.toggleTheme.bind(this);
  }
  render() {
    return <Bp.Button id="dark-theme-toggle" icon={this.state.dark ? 'flash' : 'moon'} intent="none" onClick={this.toggleTheme} />;
  }
  toggleTheme() {
    document.body.classList.toggle('bp3-dark');
    this.setState((state) => {
      return {
        dark: !state.dark
      }
    })
  }
}
