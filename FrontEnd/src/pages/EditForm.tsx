import CreateInput from "../components/CreateInput";
import Form from "../components/Form";

function EditFormPage() {
    return (<div>
        <h1>Title</h1>
        <div>
            <input type="text" name="api-route"/>
        </div>
        <Form/>
        <CreateInput/>
    </div> );
}

export default EditFormPage;