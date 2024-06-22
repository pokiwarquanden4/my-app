import { WithContext as ReactTags, Tag } from 'react-tag-input';
import { useAppSelector } from '../../App/hook';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { showAlert } from '../Alert/Alert';

interface IReactTagsComponent {
    tags: Tag[],
    setTags: Dispatch<SetStateAction<Tag[]>>
}

const KeyCodes = {
    comma: 188,
    enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

function ReactTagsComponent(props: IReactTagsComponent) {

    const tagsSlice = useAppSelector(store => store.data.tags)

    const suggestions: Tag[] = (tagsSlice || []).map((tag, index) => {
        return {
            id: String(index),
            text: tag
        };
    });

    const handleDelete = useCallback((i: number) => {
        props.setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
    }, [props]);

    const handleAddition = useCallback((tag: Tag) => {
        if (tagsSlice.includes(tag.text)) {
            props.setTags((prevTags) => [...prevTags, tag])
        } else {
            showAlert("Tag do not exsit", 'warning')
        };
    }, [props, tagsSlice])

    return <ReactTags
        autofocus={false}
        tags={props.tags}
        suggestions={suggestions}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="bottom"
        autocomplete
    />
}

export default ReactTagsComponent