import { Button } from '@blueprintjs/core';
import * as React from 'react';
import { Component } from 'react';

export class Test extends Component {
  render() {
    return (
      <div>
        <Button icon="add" intent="primary">
          hello
        </Button>
      </div>
    )
  }
}