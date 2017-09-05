/**
 * Created by Administrator on 2017/9/5 0005.
 */
import {connect} from 'react-redux'
import {setVisibilityFilter} from '../action'
import Link from '../components/Link'

const mapStateToProps  = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
