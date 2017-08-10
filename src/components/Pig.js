import React from 'react';
import {Card, Image} from 'semantic-ui-react'

class Pig extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      detailView: false,
    }

  }

  displayPigInfo = (event) => {
    this.setState({
      detailView: !this.state.detailView
    })
  }

  render(){
    return (
      <div style={{display: `${this.props.display}`}}>
      <p></p>
      <p></p>
        <Card className="ui three wide column" >
          <Image src={`./hog-imgs/${this.props.pig.name.toLowerCase().replace(/ /g, "_")}.jpg`} alt="pig pic" />
          <div name={this.props.pig.id} onClick={this.props.onHidePig}>Hide</div>
          <Card.Content>
            <Card.Header onClick={this.displayPigInfo}>
              {this.props.pig.name}
            </Card.Header>
            {this.state.detailView && <Card.Description>
              <p><strong>Specialty:</strong> {this.props.pig.specialty}</p>
              <p><strong>Weight:</strong> {this.props.pig[`weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water`]}</p>
              <p><strong>Medal:</strong> {this.props.pig[`highest medal achieved`]}</p>
            </Card.Description>}
            </Card.Content>
        </Card>
      </div>
    )
  };
};

export default Pig;
