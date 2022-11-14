export const ClubAPI = (() => {
    function getClub() { return }
    function createClub() { return } // /club (POST)
    function editClub() { return }
    function deleteClub() { return }

    function getClubMembers() { return }
    function removeClubMember() { return }
    function assignClubMemberRole() { return }

    function getClubEvents() { return }
    function createClubEvent() { return }

    function getClubTags() { return }
    function createClubTag() { return }

    return Object.freeze({
        getClub,
        createClub,
        editClub,
        deleteClub,
        getClubMembers,
        removeClubMember,
        assignClubMemberRole,
        getClubEvents,
        createClubEvent,
        getClubTags,
        createClubTag,
    })
})()
