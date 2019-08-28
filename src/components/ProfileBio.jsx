import React from 'react';

class ProfileBio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: 6,
            followers: 0,
            following: 0,
            bio: 'Just a girl who loves all this food',
            link: 'https://buzzfeed.com',
            showUpdate: false,
            updateText: undefined
        }
    }

    onShowUpdate = () => {
        this.setState({
            showUpdate: true
        });
    }

    onUpdateBio = () => {
        this.setState({
            showUpdate: false,
            bio: this.state.updateText
        });
    }

    onFollow = () => {
        this.setState({
            followers: this.state.followers + 1
        });
    };

    renderUpdate() {
        if (this.state.showUpdate) {
            return (
                <div className='profileUpdateBioSection'>
                    <textarea type='text' id='bioUpdate' onChange={(event) => { this.setState({updateText: event.target.value})}} />
                    <button type='button' name='submit' onClick={this.onUpdateBio} className='submitButton'>Done</button>
                </div>
            )
        }
        return undefined;
    }

    render() {
        return (
            <div className='profileBioContainer'>
                <div className='profileBioPerson'>
                    <div className='profileBioName'>ilovefood</div>
                    <button type='button' onClick={this.onFollow}>Follow</button>
                    <button className='postButton'>Post</button>
                    <button className='updateButton' onClick={this.onShowUpdate}>Edit</button>
                </div>
                <div className='profileBioStatus'>
                    <div className='profileBioStatusItem'>{this.state.posts} Posts</div>
                    <div className='profileBioStatusItem'>{this.state.followers} Followers</div>
                    <div className='profileBioStatusItem'>{this.state.following} Following</div>
                </div>
                {this.renderUpdate()}
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