import './index.css'

const SlideItem = props => {
  const {slideDetails, index, active, onClickSetActiveSlide} = props
  const {id, heading, description} = slideDetails

  const onChangeSlide = () => {
    onClickSetActiveSlide(id)
  }

  return (
    <li
      testid={`slideTab${index + 1}`}
      className={active ? 'li-active' : ''}
      onClick={onChangeSlide}
    >
      <p className="slider-index">{index + 1}</p>
      <div className="mini-card-container">
        <h1 className="mini-heading">{heading}</h1>
        <p className="mini-description">{description}</p>
      </div>
    </li>
  )
}

export default SlideItem
