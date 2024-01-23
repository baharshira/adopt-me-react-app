import { Component } from "react";

class Carousel extends Component {

    // this state property tracks the active images in the carousel
    state = {
        active: 0,
    };

    // sets the default images props (in case the images are unavailable)
    // static is used in order to call the method directly on the class on not on an instance of the class
    static defaultProps = {
        images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
    };

    // sets the selected image to be the main carousel image (e.g. active), based on the image's index
    handleIndexClick = (event) => {
        this.setState({
            active: +event.target.dataset.index,
        });
    };

    render() {
        const { active } = this.state; // the active image is the image in the state
        const { images } = this.props; // the images are taken from the props
        return (
            <div className="carousel">
                <img src={images[active]} alt="animal" />
                <div className="carousel-smaller">
                    {images.map((photo, index) => (
                        <img
                            key={photo}
                            src={photo}
                            className={index === active ? "active" : ""}
                            alt="animal thumbnail"
                            onClick={this.handleIndexClick}
                            data-index={index}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;