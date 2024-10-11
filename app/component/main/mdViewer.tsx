import Markdown from "react-markdown"

export default function MDViewer({text}){
    // a, blockquote, br, code, em, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, strong, and ul

    const components = {
        a(props) {
            const {node, ...rest} = props
            return <a class="link link-secondary" {...rest} />
        },
        em(props) {
            const {node, ...rest} = props
            return <em className='italic font-semibold text-info' {...rest} />
        },
        h1(props) {
            const {node, ...rest} = props
            return <h1 className='text-2xl font-extrabold text-base-content' {...rest} />
        },
        h2(props) {
            const {node, ...rest} = props
            return <h2 className='text-xl font-bold text-base-content' {...rest} />
        },
        h3(props) {
            const {node, ...rest} = props
            return <h3 className='text-lg font-bold text-base-content' {...rest} />
        },
        h4(props) {
            const {node, ...rest} = props
            return <h4 className='text-lg font-bold text-base-content' {...rest} />
        },
        h5(props) {
            const {node, ...rest} = props
            return <h5 className='text-lg font-bold text-base-content' {...rest} />
        },
        h6(props) {
            const {node, ...rest} = props
            return <h6 className='text-lg font-bold text-base-content' {...rest} />
        },
        img(props) {
            const {node, ...rest} = props
            return <img className='w-full p-2' {...rest} />
        },
        li(props) {
            const {node, ...rest} = props
            return <li className='text-md font-normal text-base-content' {...rest} />
        },
        ol(props) {
            const {node, ...rest} = props
            return <ol className='text-md font-normal text-base-content list-decimal list-inside' {...rest} />
        },
        ul(props) {
            const {node, ...rest} = props
            return <ul className='text-md font-normal text-base-content list-disc list-inside' {...rest} />
        },
        p(props) {
            const {node, ...rest} = props
            return <p className='text-md font-normal text-base-content' {...rest} />
        },
        strong(props) {
            const {node, ...rest} = props
            return <strong className='text-md font-bold text-base-content' {...rest} />
        }
        
    }

    return <Markdown components={components}>{text}</Markdown>
}