import React from "react";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../history";
import { fetchStream, deleteStreams } from "../../actions";

class StreamDelete extends React.Component {
   componentDidMount() {
      this.props.fetchStream(this.props.match.params.id);
   }

   renderActions() {
      const { id } = this.props.match.params;
      return (
         <React.Fragment>
            <button
               onClick={() => this.props.deleteStreams(id)}
               className="ui button red"
            >
               Delete
            </button>
            <Link to="/" className="ui button">
               Cancel
            </Link>
         </React.Fragment>
      );
   }
   renderContent() {
      if (!this.props.stream) {
         return "Are you sure you want to delete this stream?";
      }
      return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
   }
   render() {
      return (
         <Modal
            title="Delete Stream"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={() => history.push("/")}
         />
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStreams })(
   StreamDelete
);
