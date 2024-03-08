const { gql, default: request } = require("graphql-request");

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/cltd34b8c3le807usuqw3dww0/master";

const getCategory = async () => {
    try {
        const query = gql`
            query Category {
                categories {
                    id
                    name
                    bgcolor {
                        hex
                    }
                    icon {
                        url
                    }
                }
            }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error; // Rethrow the error if needed
    }
};
const getBusinessList = async () => {
    try {
        const query = gql`
        query BusinessList {
            businessLists {
              about
              address
              category {
                name
              }
              contactPerson
              email
              id
              image {
                url
              }
              name
            }
          }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching BusinessList:", error);
        throw error; // Rethrow the error if needed
    }
};
const getBusinessByCategory = async (category) => {
    try {
        const query = gql`
        query BusinessByCategory {
            businessLists(where: {category: {name: "`+category+`"}}) {
              about
              address
              category {
                name
              }
              contactPerson
              email
              id
              image {
                url
              }
              name
            }
          }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching BusinessList:", error);
        throw error; // Rethrow the error if needed
    }
};
export default{
    getCategory,
    getBusinessList,
    getBusinessByCategory,
}