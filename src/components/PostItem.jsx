import React from 'react';

class PostItem extends React.Component {
    render() {
        const image = {backgroundImage: `url(${this.props.image}`};

        return (
            <div className='postItemContainer' key={this.props.key}>
                <div className='postItem' style={image}/>
            </div>
        )
    }
}

export default PostItem;