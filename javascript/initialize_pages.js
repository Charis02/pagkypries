function initialize_page()
{
    let page_name = window.location.pathname.split("/").pop();
    switch(page_name)
    {
        case "mean_rank":
            mean();
            break;
        case "minmax":
            console.log("here!");
            minmax();
            break;
        case "rank_by_lesson":
            rank_by_lesson();
            break;
        case "cyprus_curved":
            cyprus_curved();
            break;
        case "bases":
            bases();
            break;
        case "bases_chart":
            bases_chart();
            break;
        case "student_chart":
            student_chart();
            break;
        case "lesson_histograms":
            lesson_histograms();
        default:
            break;
    }

    return;
}

initialize_page();