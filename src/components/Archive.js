import React, { PureComponent } from 'react';

class Archive extends PureComponent {
  renderDate = (unix) => {
    const d = new Date(unix);
    const date = d.getDate()
    const month = d.getMonth();
    const year = d.getFullYear();
    const hr = d.getHours();
    const mins = d.getMinutes();
    return `${date} ${month} ${year} ${hr}:${mins}`;
  }

  renderText = (text) => {
    return {__html: text};
  }

  renderSingleItem = (item) => {
    return (
      <div className="archive-item-container">
          <div className="archive-item">
            <img className="archive-item-image" src={item.url} alt="hotdog" />
            <div className="archive-item-body">
              <div className="archive-item-body">
                <div className="archive-item-details">
                  ID# {item.fortuneId} &nbsp; &nbsp; &nbsp; {this.renderDate(item.time)}
                </div>
                <div dangerouslySetInnerHTML={this.renderText(item.text)} className="archive-item-text">
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }

  render() {
    return (
      <div className="archive">
        {this.props.archivedItems.map((item) => this.renderSingleItem(item))}
      </div>
    );
  }
}

export default Archive;
