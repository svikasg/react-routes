import React, { Component, PropTypes } from 'react';
import { fetchPost, deletePost } from '../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class PostsShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onClickDelete () {
		this.props.deletePost(this.props.params.id).then( () => {
			this.context.router.push('/');
		});
	}

	render () {
		const { post } = this.props;

		if (!post) {
			return <div>Loading ... </div>;
		}

		return (
			<div>
				<Link to="/">Back to Home page</Link>
				<button
					onClick={this.onClickDelete.bind(this)}
					className="btn btn-danger pull-xs-right">
					Delete Post
				</button>
				<h3> {post.title} </h3>
				<h6> Categories: {post.categories} </h6>
				<p> {post.content} </p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
