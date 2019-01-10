import * as React from 'react';
class CanvasComponent extends React.PureComponent {

    constructor(props){
        super(props)
        this.state={
            img:this.props.image,
            text:(this.props.text)?(this.props.text.split(" ").slice(0,3).join(" ")):'your text',
        }
    }

    setCtx(ctx){
      this.ctx=ctx.getContext("2d")
    }
    
    setRef=(ctx)=>{
      this.ctx=ctx.getContext("2d");
    }

    componentWillReceiveProps(nextProps) {
        this.setState({text:nextProps.text,img:nextProps.image})
    }

    componentDidUpdate(){
        this.ctx.save();
        this.ctx.clearRect(0, 0, 800, 981);
        const img = this.refs.image
        this.ctx.drawImage(img, 0, 0, img.width, img.height)
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.textAlign = 'center'; 
        this.ctx.font = "60px Gotham"
        this.ctx.measureText(this.state.text)
        this.ctx.fillText(this.state.text.split(" ").slice(0,3).join(" "), img.width/2, img.height/8)
        this.props.onDataURLChange(this.ctx.canvas.toDataURL('image/png'),this.props.text)

        
    }

    componentDidMount() {
       
        this.ctx.save();
        const img = this.refs.image
        img.onload = () => {
          this.ctx.drawImage(img, 0, 0)
          this.ctx.fillStyle = "#FFFFFF";
          this.ctx.textAlign = 'center'; 
          this.ctx.font = "60px Gotham"
          this.ctx.measureText(this.state.text)
          this.props.onDataURLChange(this.ctx.canvas.toDataURL('image/png'),this.props.text)
          this.ctx.fillText(this.state.text,img.width/2, img.height/8)
        
        }
      }
      render() {
        return(
          <div>
            <canvas id="myCanvas"   width={800} height={981}  ref={this.setRef} />
            <img alt="imagem" ref="image" className="img-responsive" src={this.state.img} hidden />
          </div>
        )
      }
}

export default CanvasComponent