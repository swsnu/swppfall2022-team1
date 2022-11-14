export const UserAPI = (() => {
    function getMyProfile() { return }
    function editMyProfile() { return }
    function deleteAccount() { return }
    function getUser() { return }

    function participateInEnrollment() { return }
    function unparticipateInEnrollment() { return }
    function participateInScheduling() { return }

    function getUserClubs() { return }
    function registerNewClub() { return }
    function leaveClub() { return }

    return Object.freeze({
        getMyProfile,
        editMyProfile,
        deleteAccount,
        getUser,
        participateInEnrollment,
        unparticipateInEnrollment,
        participateInScheduling,
        getUserClubs,
        registerNewClub,
        leaveClub,
    })
})()
