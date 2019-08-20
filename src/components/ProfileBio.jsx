import React from 'react';

class ProfileBio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: 0,
            followers: 0,
            following: 0,
            bio: 'Just a girl who loves all this food',
            link: 'https://buzzfeed.com'
        }
    }

    render() {
        return (
            <div className='profileBioContainer'>
                <div className='profileBioPerson'>
                    <div className='profileBioName'>ilovefood</div>
                    <button>Follow</button>
                    <button className='postButton'>Post</button>
                </div>
                <div className='profileBioStatus'>
                    <div className='profileBioStatusItem'>{this.state.posts} Posts</div>
                    <div className='profileBioStatusItem'>{this.state.followers} Followers</div>
                    <div className='profileBioStatusItem'>{this.state.following} Following</div>
                </div>
                <div className='profileBioDescription'>
                    <div className='profileBioDescriptionName'>Food Magazine</div>
                    <div>{this.state.bio}</div>
                    <div className='profileBioDescriptionLink'>{this.state.link}</div>

                </div>
            </div>
        )
    }
}

export default ProfileBio;