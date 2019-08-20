import React from 'react';
import PostItem from '../components/PostItem';

const image1 = require('../assets/appetizer-bacon-cuisine-2097090.jpg');
const image2 = require('../assets/appetizing-bread-close-up-357573.jpg');
const image3 = require('../assets/asian-food-bowl-cuisine-699953.jpg');
const image4 = require('../assets/banana-bowl-delicious-1333746.jpg');
const image5 = require('../assets/beef-blur-chicken-323682.jpg');
const image6 = require('../assets/close-up-dinner-fish-46239.jpg');

class PostGrid extends React.Component {
    listOfImages() {
        const list = [image1, image2, image3, image4, image5, image6];

        return list.map((item, index) => {
            return <PostItem image={item} key={index} />
        })
    }

    render() {
        return (
            <div className='postGridContainer'>
                <div className='postGrid'>
                    {this.listOfImages()}
                </div>
            </div>
        )
    }
}

export default PostGrid;