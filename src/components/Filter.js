import React from 'react';
import { Dropdown, Button } from 'semantic-ui-react'

class Filter extends React.Component {

  render(){
    return(
      <div>

        <Dropdown text={this.props.filterMode} icon="filter" floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content="Filter by greased" />
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.props.onFilter}>All</Dropdown.Item>
            <Dropdown.Item onClick={this.props.onFilter}>Greased</Dropdown.Item>
            <Dropdown.Item onClick={this.props.onFilter}>Not Greased</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown text={this.props.sortMode} icon="filter" floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content="Sort By" />
            <Dropdown.Divider />
            <Dropdown.Item onClick={this.props.onSort}>Name</Dropdown.Item>
            <Dropdown.Item onClick={this.props.onSort}>Weight</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button onClick={this.props.showAllPigs}>
          Show Hidden Pigs
        </Button>

        <Button onClick={this.props.showPigGifs}>
          {this.props.gifButtonTitle ? 'Hide Pig Gif' : 'See A Pig Gif!'}
        </Button>

      </div>
    );
  }
};

export default Filter;
