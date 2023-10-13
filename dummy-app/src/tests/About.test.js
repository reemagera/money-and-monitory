import React from 'react';
import { shallow } from 'enzyme';
import About from '../components/About';

describe('About Component', () => {
    it('should render without errors', () => {
        const wrapper = shallow(<About />);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render feature rows correctly', () => {
        const wrapper = shallow(<About />);
        const featureRows = wrapper.find('StyledTableRow');
        expect(featureRows).toHaveLength(5); // Assuming you have 5 rows

        featureRows.forEach((row, index) => {
            const featureName = row.find('StyledTableCell').at(0);
            const withPlanCell = row.find('StyledTableCell').at(1);
            const withoutPlanCell = row.find('StyledTableCell').at(2);

            expect(featureName.text()).toEqual(row[index].feature);
            // You can add more assertions for withPlanCell and withoutPlanCell if needed.
        });
    });

    it('should render timeline steps correctly', () => {
        const wrapper = shallow(<About />);
        const timelineItems = wrapper.find('TimelineItem');
        expect(timelineItems).toHaveLength(4); // 3 steps and 1 final step

        timelineItems.forEach((item, index) => {
            const stepText = item.find('h4');
            const descriptionText = item.find('p');

            expect(stepText.text()).toEqual(steps[index].step);
            expect(descriptionText.text()).toEqual(steps[index].description);
        });
    });
});