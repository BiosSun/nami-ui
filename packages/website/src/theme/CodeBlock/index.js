import CodeBlock from '@theme-init/CodeBlock'
import Playground from '@theme/Playground'

const withReactView = (Component) => {
    const ReactViewWrappedComponent = (props) => {
        if (props.reactView) {
            return <Playground initialCode={props.children} />
        }

        return <Component {...props} />
    }

    return ReactViewWrappedComponent
}

export default withReactView(CodeBlock)
