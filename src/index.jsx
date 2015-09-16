import { requestAnimationFrame, cancelAnimationFrame } from "./request-animation-frame";

let fs = require("fs");
import insertCss from "insert-css";
let css = fs.readFileSync(__dirname + "/index.css");
insertCss(css, {prepend: true});

import React from "react";

class ThumbnailBar extends React.Component {

	constructor(props) {
		super(props);
		this.scrollListener = this.loadVisibleThumbnails.bind(this);
		this.animationFrameListener = this.onAnimationFrame.bind(this);
		this.desiredScrollLeft = -1;
		this.scrollAcceleration = 10;
	}

	componentDidMount() {
		this.loadVisibleThumbnails();
		this.scrollToCurrent()

		React.findDOMNode(this).addEventListener("scroll", this.scrollListener);
		requestAnimationFrame(this.animationFrameListener);
		window.addEventListener("resize", this.scrollListener);
	}

	componentDidUpdate() {
		this.loadVisibleThumbnails();
		this.scrollToCurrent()
	}

	componentWillUnmount() {
		React.findDOMNode(this).removeEventListener("scroll", this.scrollListener);
		window.removeEventListener("resize", this.scrollListener);
	}

	onAnimationFrame() {
		let me = React.findDOMNode(this);
		if(this.desiredScrollLeft > -1){
			let delta = this.desiredScrollLeft - me.scrollLeft;
			if(delta !== 0) {
				let newLeft = Math.floor(me.scrollLeft + (delta > 0 ? this.scrollAcceleration : -this.scrollAcceleration));
				if((delta > 0 && newLeft > this.desiredScrollLeft) || (delta < 0 && newLeft < this.desiredScrollLeft)) { 
					newLeft = this.desiredScrollLeft; 
				} else { 
					if(delta < 250 && delta > -250 && this.scrollAcceleration > 10) {
						this.scrollAcceleration *= 0.8;
					} else {
						this.scrollAcceleration *= 1.1; 
					}
				}
				me.scrollLeft = newLeft;
			} else {
				this.desiredScrollLeft = -1;
				this.scrollAcceleration = 10;
			}
		}
		requestAnimationFrame(this.animationFrameListener);
	}

	scrollToCurrent() {
		let me = React.findDOMNode(this);
		let current = me.querySelector(".selected");
		if(!current) { return; }
		let rect = me.getBoundingClientRect();
		let rectCurrent = current.getBoundingClientRect();
		let desired = (rectCurrent.left - rect.left + me.scrollLeft) - Math.floor(rect.width * 0.5) + Math.floor(rectCurrent.width / 2);
		this.desiredScrollLeft = desired < 0 ? 0 : desired;
	}

	loadVisibleThumbnails() {
		let me = React.findDOMNode(this);
		let scrollLeft = me.scrollLeft;
		let thumbs = me.querySelectorAll("img[data-src]");
		let rect = me.getBoundingClientRect();
		for(let i = 0; i < thumbs.length; i++) {
			let left = thumbs[i].parentNode.offsetLeft - scrollLeft - rect.left;
			if(left > 0 && left < rect.width) {
				thumbs[i].setAttribute("src", thumbs[i].getAttribute("data-src"));
				thumbs[i].removeAttribute("data-src");
			}
		}
	}

	onSelect(ev) {
		this.props.onSelect(ev.target.getAttribute("data-id"));
	}

	renderThumbnail(id, i) {
		let src = this.props.thumbnails[id];
		return (
			<span className={""+id === this.props.id ? "selected" : null}>
				<img data-id={id} data-src={src} onClick={this.onSelect.bind(this)}  />
			</span>
		);
	}

	render() {
		return (
			<nav className="hire-thumbnail-bar">
				<div>
					{this.props.results.ids.map(this.renderThumbnail.bind(this))}
				</div>
			</nav>
		);
	}
}

ThumbnailBar.propTypes = {
	id: React.PropTypes.string,
	onSelect: React.PropTypes.func,
	results: React.PropTypes.object,
	thumbnails: React.PropTypes.object
};

export default ThumbnailBar;