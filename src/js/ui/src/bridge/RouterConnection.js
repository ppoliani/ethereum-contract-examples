import {connect} from 'react-redux';

export default Router => {
  const mapStateToProps = state => state;
  const mapDispatchToProps = dispatch => ({});

  return connect(mapStateToProps,mapDispatchToProps)(Router);
}
