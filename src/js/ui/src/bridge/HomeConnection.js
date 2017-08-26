import {connect} from 'react-redux';

export default Home => {
  const mapStateToProps = state => state;

  const mapDispatchToProps = dispatch => ({

  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
