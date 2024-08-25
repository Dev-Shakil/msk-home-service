const { gql, default: request } = require("graphql-request");

const MASTER_URL = `https://api-ap-south-1.hygraph.com/v2/${process.env.NEXT_PUBLIC_MASTER_URL_KEY}/master`;
console.log("Master URL: " + MASTER_URL);

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
const getBusinessById =async (id) => {
  try {
    const query = gql`
    query BusinessListById {
      businessList(where: {id: "${id}"}) {
        about
        address
        email
        id
        image {
          url
        }
        name
        contactPerson
        category {
          name
        }
      }
    }
    `;

    const result = await request(MASTER_URL, query);
    return result;
} catch (error) {
    console.error("Error fetching BusinessList:", error);
    throw error; // Rethrow the error if needed
}
}
const createNewBooking = async (businessId,date,time,userEmail,userName,)=>{
  console.log(businessId,date,time,userEmail,userName)
  try {
  const mutationQuery = gql`
  mutation CreateBookig {
    createBooking(
      data:{bookingStatus: Booked,businessList: {connect: {id: "`+businessId+`"}},date: "`+date+`", time: "`+time+`",userEmail: "`+userEmail+`",userName: "`+userName+`",  }
    ) {
      id
    }
    publishManyBookings(to:PUBLISHED){
      count
    }
  }`
  const result = await request(MASTER_URL, mutationQuery,{
    headers: {
      "authorization": `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_PERMANENT_AUTH_TOKEN}`
    },
  });


    console.log(result)
    return result;
  } catch (error) {
    console.error("Error Posting Booking:", error);
    throw error; // Rethrow the error if needed
}
}
const BusinessBookedSlot = async (businessId,date) => {
  try{
    const query = gql`
    query BusinessBookedSlot {
      bookings(where: {businessList: {id: "${businessId}"}, date: "${date}"}) {
        date
        time
      }
    }
    
    `
    const result = await request(MASTER_URL, query);
  
  
      console.log(result)
      return result;
  }catch(error){
    console.log(error)
  }
}
const getUserBookingHistory = async (userEmail) => {
  try{
    const query = gql`
      query  {
        bookings(where: {userEmail: "${userEmail}"},
          orderBy: publishedAt_DESC
        ) {
          businessList {
            name
            image {
              url
            }
            contactPerson
            address
          }
          date
          time
        }
      }
    `
    const result = await request(MASTER_URL, query);
  
  
      console.log(result)
      return result;
  }catch(error){
    console.log(error)
  }
}
export default{
    getUserBookingHistory,
    getCategory,
    getBusinessList,
    getBusinessByCategory,
    getBusinessById,
    createNewBooking,
    BusinessBookedSlot,
}