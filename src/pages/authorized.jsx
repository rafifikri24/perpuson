import "bootstrap/dist/css/bootstrap.css"
export default function Authorized(){
    return(
        <div className="vh-100 d-flex justify-content-center align-items-center flex-column" style={{ fontFamily: "'Press Start 2P', system-ui", backgroundColor:'black' }}>
            <div style={{fontSize:"300px",color:'greenyellow'}}>403</div>
            <div style={{fontSize:"100px",color:'greenyellow'}}>Forbiden</div>
        </div>
    )
}
