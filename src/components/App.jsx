import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import searchYouTube from '../lib/searchYouTube.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: exampleVideoData[0],
      videos: exampleVideoData,
    };
    this.searchVideos = this.searchVideos.bind(this);
    this.onVideoListEntryClick = this.onVideoListEntryClick.bind(this);
  }
  
  onVideoListEntryClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  componentDidMount() {
    var options = {
      query: 'dogs',
      max: 5,
      key: YOUTUBE_API_KEY
    };
    
    searchYouTube(options, (data) => {
      this.setState({
        currentVideo: data[0],
        videos: data
      });
    });
  }

  searchVideos(query) {
    var options = {
      query: query,
      max: 5,
      key: YOUTUBE_API_KEY
    };
    
    searchYouTube(options, (data) => {
      this.setState({
        currentVideo: data[0],
        videos: data
      });
    });
  }

  render() {
    const { currentVideo, videos} = this.state;
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchYT={this.searchVideos}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList onClick={this.onVideoListEntryClick} videos={videos}/>
          </div>
        </div>
      </div>
    );
  }
}

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default App;
