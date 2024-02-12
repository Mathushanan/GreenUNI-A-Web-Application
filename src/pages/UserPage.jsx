import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
   <>
   <UserHeader/>
   <UserPost likes={1200} replies={293} postImg="./post1.png" postTitle={"Lets have a fun! "} />
   <UserPost likes={1200} replies={293} postImg="./post2.png" postTitle={"Lets have a fun! "} />
   <UserPost likes={1200} replies={293} postImg="./post3.png" postTitle={"Lets have a fun! "} />
   <UserPost likes={1200} replies={293}  postTitle={"Lets have a fun! "} />
   
   
   </>
  )
}

export default UserPage
