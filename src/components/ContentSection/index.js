import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import './index.css'
import SlideItem from '../SlideItem'
import Navbar from '../Navbar'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class ContentSection extends Component {
  state = {
    editHeading: false,
    editParagraph: false,
    activeId: initialSlidesList[0].id,
    ListOfSlides: [...initialSlidesList],
  }

  onClickSetActiveSlide = id => {
    this.setState({activeId: id})
  }

  onTextUpdate = event => {
    this.setState(prevState => {
      const {ListOfSlides, activeId} = prevState
      const [...newList] = ListOfSlides

      const index = newList.findIndex(slide => slide.id === activeId)
      if (event.target.id === 'heading') {
        newList[index].heading = event.target.value
      } else {
        newList[index].description = event.target.value
      }
      return {ListOfSlides: [...newList]}
    })
  }

  onToggle = event => {
    if (event.target.id === 'heading') {
      this.setState(prevState => ({
        editHeading: !prevState.editHeading,
        editParagraph: false,
      }))
    } else {
      this.setState(prevState => ({
        editParagraph: !prevState.editParagraph,
        editHeading: false,
      }))
    }
  }

  onLoseFocus = event => {
    this.setState(prevState => {
      const {ListOfSlides, activeId} = prevState
      const [...newList] = ListOfSlides
      const index = newList.findIndex(slide => slide.id === activeId)
      const result = {}
      if (event.target.id === 'heading') {
        newList[index].heading =
          event.target.value === '' ? 'Heading' : event.target.value
        result.editHeading = false
      } else {
        newList[index].description =
          event.target.value === '' ? 'Description' : event.target.value
        result.editParagraph = false
      }

      return {
        ListOfSlides: [...newList],
        ...result,
      }
    })
  }

  onClickNew = () => {
    this.setState(prevState => {
      const {ListOfSlides, activeId} = prevState
      const [...newList] = ListOfSlides

      const index = newList.findIndex(slide => slide.id === activeId)
      const id = uuid()
      const newItem = {
        id,
        heading: 'Heading',
        description: 'Description',
      }
      newList.splice(index + 1, 0, newItem)
      return {ListOfSlides: [...newList], activeId: id}
    })
  }

  render() {
    const {editHeading, editParagraph, activeId, ListOfSlides} = this.state
    const ActiveSlide = ListOfSlides.find(slide => slide.id === activeId)
    return (
      <div className="outer-container">
        <Navbar />
        <div className="tool-bar">
          <button type="button" className="add-btn" onClick={this.onClickNew}>
            <img
              className="plus-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="new plus icon"
            />
            New
          </button>
        </div>

        <div className="main-body">
          <div className="left-container">
            <ol className="slider">
              {ListOfSlides.map((slide, index) => (
                <SlideItem
                  slideDetails={slide}
                  key={slide.id}
                  index={index}
                  onClickSetActiveSlide={this.onClickSetActiveSlide}
                  active={slide.id === activeId}
                />
              ))}
            </ol>
          </div>
          <div className="right-container">
            <div className="slide-card-container">
              {editHeading ? (
                <input
                  className="heading-input"
                  onChange={this.onTextUpdate}
                  id="heading"
                  value={ActiveSlide.heading}
                  onBlur={this.onLoseFocus}
                />
              ) : (
                <h1 id="heading" onClick={this.onToggle}>
                  {ActiveSlide.heading}
                </h1>
              )}

              {editParagraph ? (
                <input
                  className="paragraph-input"
                  id="description"
                  onChange={this.onTextUpdate}
                  value={ActiveSlide.description}
                  onBlur={this.onLoseFocus}
                />
              ) : (
                <p id="description" onClick={this.onToggle}>
                  {ActiveSlide.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContentSection
