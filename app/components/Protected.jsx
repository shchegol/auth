import React, { Component } from 'react'

export default class Protected extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <h3>Protected</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          deserunt dolorem eligendi fuga laudantium mollitia nemo officiis
          pariatur quibusdam voluptatibus? Aliquid blanditiis error explicabo
          labore libero perferendis praesentium quam voluptates!
        </p>
      </div>

    )
  }
}