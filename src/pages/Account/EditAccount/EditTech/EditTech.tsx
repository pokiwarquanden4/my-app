import { Dispatch, SetStateAction } from 'react'
import { Tag } from 'react-tag-input'
import { useAppDispatch } from '../../../../App/hook'
import ReactTagsComponent from '../../../../Component/ReactTags/ReactTagsComponent'
import { IUserLogin } from '../../../../Reducers/UserSlice'

interface IEditAccountProps {
    tags: Tag[]
    setTags: Dispatch<SetStateAction<Tag[]>>
    onEditTech: (e: any) => void
}


function EditTech(props: IEditAccountProps) {

    return <div>
        <div className="pt-3">
            <label htmlFor="Password" className="form-label h5">Technology</label>
            <ReactTagsComponent
                tags={props.tags}
                setTags={props.setTags}
            ></ReactTagsComponent>
        </div>
        <div className="pt-4">
            <button className="btn btn-primary" type="submit" onClick={props.onEditTech}>Submit</button>
        </div>
    </div>
}

export default EditTech