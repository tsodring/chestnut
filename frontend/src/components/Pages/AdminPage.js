import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import {
   List,
   Item,
   Grid,
   Input,
   Icon,
   Button,
   Modal,
   Header,
   Segment,
   Loader,
} from "semantic-ui-react";
import { AuthContext } from "../../context/auth-context";

const AdminPage = () => {
   const auth = useContext(AuthContext);
   const authHeader = {
      headers: {
         Authorization: auth.token,
      },
   };
   const [isLoading, setIsLoading] = useState(false);
   const [loadedUsers, setLoadedUsers] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [search, setSearch] = useState("");
   const [ModalOpen, setModalOpen] = useState(false);

   const getUrl = "http://localhost:8080/api/users";

   const handleModalOpen = (modalID) => setModalOpen(modalID);
   const handleModalClose = () => setModalOpen(false);

   // GET all users
   useEffect(() => {
      const fetchUsers = () => {
         setIsLoading(true);
         Axios.get(getUrl, authHeader)
            .then((response) => {
               setLoadedUsers(response.data.users);
               setFilteredUsers(response.data.users);
               setIsLoading(false);
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      };
      fetchUsers();
   }, []);

   // DELETE an user
   const deleteUser = (UserID) => {
      const deleteUrl = "http://localhost:8080/api/users/" + UserID;

      setIsLoading(true);
      Axios.delete(deleteUrl, authHeader)
         .then(() => {
            return Axios.get(getUrl, authHeader);
         })
         .then((response) => {
            setLoadedUsers(response.data.users);
            setFilteredUsers(response.data.users);
            handleModalClose();
            setIsLoading(false);
         })
         .catch((err) => {
            console.log(err.response.data);
         });
   };

   useEffect(() => {
      loadedUsers &&
         setFilteredUsers(
            loadedUsers.filter((user) =>
               user.Username.toLowerCase().includes(search.toLowerCase())
            )
         );
   }, [search]);

   return (
      <Grid columns={1} stackable style={{ margin: "2.5rem" }}>
         <Grid.Column>
            <Grid.Row>
               <h1>List of users</h1>
               <h3>Search user:</h3>
               <Input
                  icon="search"
                  onChange={(e) => setSearch(e.target.value)}
               />
            </Grid.Row>
            <Grid.Row style={{ marginTop: "1.5rem" }}>
               <Segment>
                  <List divided relaxed>
                     {!isLoading &&
                        filteredUsers.map((item) => (
                           <List.Item as="a" key={item.ID}>
                              <List.Icon
                                 name="user"
                                 size="large"
                                 verticalAlign="middle"
                              />
                              <Item.Content>
                                 <List.Header>{item.Username}</List.Header>
                                 <Modal
                                    trigger={
                                       <Button
                                          compact
                                          negative
                                          content="Delete user"
                                          floated="right"
                                          onClick={() =>
                                             handleModalOpen(item.ID)
                                          }
                                       />
                                    }
                                    open={ModalOpen == item.ID}
                                 >
                                    <Header
                                       icon="delete"
                                       color="red"
                                       content="Delete user?"
                                    />
                                    <Modal.Content>
                                       <p>
                                          This is a <b>permanent</b> action and
                                          will delete both the user and his
                                          keys.
                                       </p>
                                       <p>
                                          Are you sure you want to delete{" "}
                                          <b>{item.Username}</b>?
                                       </p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                       <Button
                                          color="red"
                                          onClick={handleModalClose}
                                       >
                                          <Icon name="remove" />
                                          No
                                       </Button>
                                       <Button
                                          color="green"
                                          onClick={() => deleteUser(item.ID)}
                                       >
                                          <Icon name="checkmark" />
                                          Yes
                                       </Button>
                                    </Modal.Actions>
                                 </Modal>
                                 <List.Description>
                                    id: {item.ID}
                                 </List.Description>
                                 <List.Description>
                                    {item.Email}
                                 </List.Description>
                              </Item.Content>
                           </List.Item>
                        ))}
                  </List>
               </Segment>
            </Grid.Row>
         </Grid.Column>
      </Grid>
   );
};

export default AdminPage;